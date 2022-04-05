import {readFile, writeFile} from "fs"

export class FileManegement
{
    static takeCodes(text){
        const codes = text.split('\r\n');
        codes.splice(codes.indexOf(''),1);

        return this.treatmentCodes(codes);
    }

         static treatmentCodes(list){
         let barCodeStatus = []
         const date = new Date()
         list.forEach(barCode => {
             let barCodes = {
                 date: barCode.substr(32,2),
                 value: barCode.substr(16,13),
                 cents: barCode.substr(29,2),
                 get fullPrice(){ 
                     return parseFloat(`${this.value}.${this.cents}`).toFixed(2);
                 }
             }

             let calculate = this.calculateValues(barCodes.fullPrice);

             if(barCodes.date < date.getDate()){
                 let message = `Código de barras:${barCode}\r\nValor:${barCodes.fullPrice.toString().replace('.',',')}\r\nDesconto:${calculate.discount.toString().replace('.',',')}\r\n`

                 console.log(message);
                 barCodeStatus.push(message);

             }else if(barCodes.date == date.getDate()){
                 let message = `Código de Barras:${barCode}\r\n Valor:${barCodes.fullPrice.toString().replace('.',',')}`
                 
                 console.log(message);
                 barCodeStatus.push(message);
             }else{
                 let message = `Código de barras:${barCode}\r\n Valor:${barCodes.fullPrice.toString().replace('.',',')}\r\nJuros:${calculate.tax.toString().replace('.',',')}\r\n`

                 console.log(message);
                 barCodeStatus.push(message);
             }
         }
         )}

         static calculateValues(fullPrice){
             let newValues={
                 tax: parseFloat(fullPrice * 0.03).toFixed(2),
                 discount: parseFloat(fullPrice * 0.05).toFixed(2)
             }
             return newValues
         }

         static writeDocs(barCodeStatus){
             let codes = barCodeStatus.join('==================================================================================\r\n');
             const newFile = './src/Model/Files/messages.txt';
             writeFile(newFile,codes, (err)=>{
                 err ? console.error(err) : console.log(`Arquivo gerado com sucesso!`);
             })
         }
         
}
