import { Workbook, type Column, type WorkbookModel } from 'exceljs';

export class ReportExcelCreator {

    items : string[]  = []
    dic : Map<string, string> = new Map

    constructor(items : string[], dic : Map<string, string>)
    {
        this.items = items
        this.dic = dic
    }

    public async create(_name: string, map: Map<string, any>[] | undefined) : Promise<Blob | undefined>
    {
        if (map === undefined) return undefined
    // ExcelJS 3 supports title at runtime; its Workbook declaration omits it.
    const wb = new Workbook() as Workbook & Pick<WorkbookModel, 'title'>
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
