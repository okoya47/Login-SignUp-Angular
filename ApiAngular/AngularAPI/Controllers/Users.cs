using AngularAPI.Context;
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
            var use = await _appDbContext.users.Select(u => new User
            {
                username = u.username,
                email = u.email,
                firstname = u.firstname
            }).ToListAsync();

            var userCheck = await _appDbContext.users.FirstOrDefaultAsync(x=> x.username == userObj.username);

            if(userCheck == null)
            {
                return NotFound(new {message  = "User not found in the database"});
            }

            return Ok(new {message = "Login is successfull!"});
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            await _appDbContext.AddAsync(userObj);
            await _appDbContext.SaveChangesAsync();

            return Ok(new {message = "User added successfull!"});
        }
    }
}
