namespace MSISEAtmosphere
{


	public partial class Atmosphere
	{
		public Atmosphere()
		{
			Init();
			output = new nrlmsise_output();
			input = new nrlmsise_input();
			input.ap_a = new ap_array();

		}


		void tselec(nrlmsise_flags flags)
		{
			int i;
			for (i = 0; i < 24; i++)
			{
				if (i != 9)
				{
					if (flags.switches[i] == 1)
						flags.sw[i] = 1;
					else
						flags.sw[i] = 0;
					if (flags.switches[i] > 0)
						flags.swc[i] = 1;
					else
						flags.swc[i] = 0;
				}
				else
				{
					flags.sw[i] = flags.switches[i];
					flags.swc[i] = flags.switches[i];
				}
			}
		}
	}
}