using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trading.Database.SqlServer.Overriden
{
    public class TradingHistory : Trading.Database.SqlServer.TradingHistory
    {
        string connectionSrting;
        public TradingHistory(string connectionSrting)
        {
            this.connectionSrting = connectionSrting;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionSrting);
            }

        }
    }
}
