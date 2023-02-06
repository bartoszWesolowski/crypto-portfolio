import { S3 } from 'aws-sdk';
import readXlsxFile, { Row } from 'read-excel-file';

import xlsx from 'node-xlsx';

export type ExcelSheet = {
  name: string;
  data: unknown[];
};

export function parseXlsx(body: S3.Body): ExcelSheet[] {
  return xlsx.parse(body) as ExcelSheet[];
}

export function parseSheet(sheet: ExcelSheet): object[] {
  const rows = [] as object[];
  if (sheet.data.length > 1) {
    const headersArray = sheet.data[0] as string[];

    for (let row = 1; row < sheet.data.length; row++) {
      const rowArray = sheet.data[row] as any[];
      if (rowArray.length > 0) {
        const rowObject: Record<string, any> = {};
        headersArray.forEach((element, index) => {
          rowObject[element] = rowArray[index];
        });
        rows.push(rowObject);
      }
    }
  }

  return rows;
}
