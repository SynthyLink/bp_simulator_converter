using AspireOnlineConverter.Server.Classes.Orbital;

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
