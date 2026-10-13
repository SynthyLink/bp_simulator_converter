import csv, sys
from pathlib import Path
if (Path(__file__).parent/'plot-deps').exists():
    sys.path.insert(0,str(Path(__file__).parent/'plot-deps'))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).parent/'evidence'
with (root/'event-residuals.csv').open() as f:
    rows=list(csv.DictReader(f))
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':9,'axes.labelsize':10,'legend.fontsize':9,'pdf.fonttype':42,'ps.fonttype':42})
fig,axes=plt.subplots(2,1,figsize=(6.7,4.5),sharex=True,layout='constrained')
colors=['#0072B2','#D55E00','#009E73','#CC79A7']
for run,color in enumerate(colors,1):
    r=[x for x in rows if int(x['run'])==run]
    x=[int(v['event']) for v in r]
    axes[0].plot(x,[float(v['position_difference_km'])*1e6 for v in r],label=f'Scenario {run}',color=color,lw=1.3)
    axes[1].plot(x,[float(v['velocity_difference_km_s'])*1e9 for v in r],color=color,lw=1.3)
for ax in axes:
    ax.axhline(1,color='#555555',ls='--',lw=1,label='Retained tolerance')
    ax.set_ylim(bottom=0,top=1.08)
    ax.grid(axis='y',color='#e0e0e0',lw=.5)
    ax.set_xlim(1,91)
axes[0].set_ylabel('Position difference (mm)')
axes[1].set_ylabel('Velocity difference (µm/s)')
axes[1].set_xlabel('Crossing-event index')
axes[0].legend(ncol=3,loc='lower center',bbox_to_anchor=(.5,1.04),frameon=False)
fig.savefig(root/'orbital-residuals.pdf',metadata={'Title':'C# and corrected TypeScript orbital replay residuals','Author':'Peter Ivankov and Max Shestov'})
fig.savefig(root/'orbital-residuals.png',dpi=180)
