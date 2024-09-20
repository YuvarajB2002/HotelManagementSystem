using HotelManagement.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly SymmetricSecurityKey _key;
        private readonly HotelDbContext _con;


        public TokenController(IConfiguration configuration, HotelDbContext con)
        {
            _key = new SymmetricSecurityKey(UTF8Encoding.UTF8.GetBytes(configuration["Key"]!));
            _con = con;
        }

        [HttpPost]
        public IActionResult GenerateToken(User user)
        {
            string token = string.Empty;
            string role = ValidateUser(user.Email, user.PasswordHash);
            var dbUser = _con.Users.FirstOrDefault(u => u.Email == user.Email && u.PasswordHash == user.PasswordHash);
            if (role!=null)
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.NameId, user.Username!),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(ClaimTypes.Role, role),// Add the user's role as a claim
                    new Claim("UserId", dbUser.UserId.ToString())
                };

                var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
                var tokenDescription = new SecurityTokenDescriptor
                {
                    SigningCredentials = cred,
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddMinutes(2)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var createToken = tokenHandler.CreateToken(tokenDescription);
                token = tokenHandler.WriteToken(createToken);
            }
            else
            {
                return NoContent();
            }
         
            return Ok(new {token =token});
        }

        private string ValidateUser(string email, string password)
        {
            var user = _con.Users.FirstOrDefault(u => u.Email == email && u.PasswordHash == password);
            if (user!=null)
            {
                return user.Role!;
            }
            return null;
        }
    }
}
