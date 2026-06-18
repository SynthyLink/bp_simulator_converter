using AspireOnlineConverter.Server.Classes;

namespace AspireOnlineConverter.Server.Interfaces
{
    public interface IForecastCondition
    {
        OrbitalForecastConditionDateTime ForecastCondition { get; set; }
    }

    public interface IForecastConditionSingleton : IForecastCondition
    {
    }

}
