import { Workbook, type Column } from 'exceljs';

interface P 
{
    name: string
    age : string
    city : string
}

interface C 
{
    header: string
    key : string
}


export class ReportExcelCreator {

    items : string[]  = []
    dic : Map<string, string> = new Map

    constructor(items : string[], dic : Map<string, string>)
    {
        this.items = items
        this.dic = dic
    }

    public async create(name: string, map: Map<string, any>[] | undefined) : Blob | undefined
    {
        if (map === undefined) return undefined
            const wb = new Workbook()
    wb.title = 'Report - ' + Date.now().toLocaleString()
    const sheet = wb.addWorksheet('Report')

    let col : Partial<Column>[] = []
        this.items.forEach((x)=>
    {
        let c :  Partial<Column> = {header : this.dic.get(x), key : x}
col.push(c)
    })


    sheet.columns =  col

let i = 0
 
    map.forEach((item: Map<string, any>) => {
  //      if (i > 10) return
        ++i
      let rowValue: any[] = []
      this.items.forEach((it : string )=>
      {
          let tt = item.get(it)
          rowValue.push(item.get(it))
      })
      sheet.addRow(rowValue)
    })

 
    const bytes = await wb.xlsx.writeBuffer()
    const data = new Blob([bytes],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      return data
    }

}