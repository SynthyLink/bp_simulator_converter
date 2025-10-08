using Microsoft.AspNetCore.Mvc;
using Trading.Library.Objects;

namespace OnlineGameConverter.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonchianTradingStratergyController : Controller
    {
        Performer performer = new();

        ILogger<DonchianTradingStratergyController> logger;

        DataQuery query;

        public DonchianTradingStratergyController(ILogger<DonchianTradingStratergyController> logger)
        {
            this.logger = logger;
        }

        [HttpGet("symbols")]
        public async Task<Dictionary<string, string>> GetSymbols(CancellationToken token)
        {
            return await StaticExtensionTradingLibrary.GetTradingHistorucalSrtingSymbols(token);
        }
    }
}
