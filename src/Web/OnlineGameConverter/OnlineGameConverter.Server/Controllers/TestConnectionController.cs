using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineGameConverter.Server.Classes;
using System.Text;

namespace OnlineGameConverter.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestConnectionController : ControllerBase
    {

        [HttpGet("test")]
        public async Task<string> GetTest()
        {
            var t = await Task.FromResult(Test);
            return t();
        }

        string Test() => "test";
   
    }
}
