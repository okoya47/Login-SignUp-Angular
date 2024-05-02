using System.Text;
using System.Text.RegularExpressions;
using AngularAPI.Context;
using AngularAPI.Helpers;
using AngularAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsersController(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj )
        {
            if(userObj == null)
            {
                return BadRequest(new  {message = "This is bad request." });
            }
            /*
            var use = await _appDbContext.users.Select(u => new User
            {
                username = u.username,
                email = u.email,
                firstname = u.firstname
            }).ToListAsync();
            */
            var userCheck = await _appDbContext.users.FirstOrDefaultAsync(x=> x.username == userObj.username);

            if(userCheck == null)
            {
                return NotFound(new {message  = "User not found in the database"});
            }

            if (!PasswordHash.VerifyPassword(userObj.password, userCheck.password))
            {
                return NotFound(new { message = "Password is incorrect!" });
            }

            return Ok(new {message = "Login is successfull!"});
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {

            if (await CheckUserNameExistAsync(userObj.username))
            {
                return BadRequest(new { message = "Username Already exist!" });
            }

            if (await CheckEmailExistAsync(userObj.email))
            {
                return BadRequest(new { message = "Email Already exist!" });
            }
            var pass =  CheckPasswordStrength(userObj.password);

            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { message = pass });
            }

            if (userObj == null)
                return BadRequest();
            userObj.password = PasswordHash.HashPassword(userObj.password);
            userObj.token = "";
            userObj.role = "user";
            await _appDbContext.AddAsync(userObj);
            await _appDbContext.SaveChangesAsync();

            return Ok(new {message = "User added successfull!"});
        }

        private async Task<bool> CheckUserNameExistAsync(string userName)
        {
            return await _appDbContext.users.AnyAsync(x => x.username == userName);
        }

        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _appDbContext.users.AnyAsync(x => x.email == email);
        }
        private string CheckPasswordStrength(string password)
        {
            StringBuilder  sb = new StringBuilder();
            if (password.Length < 8)
                 sb.Append("Maximum password length should be 8"+Environment.NewLine);
            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should Alphanumeric" + Environment.NewLine);
            if(!Regex.IsMatch(password, "[!,\\],\\[, <, >, @, \\,', ?]"))
                sb.Append("The password should contain special characters");
            return sb.ToString();
        }
    }
}
