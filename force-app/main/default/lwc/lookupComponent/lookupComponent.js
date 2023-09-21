import { LightningElement, api, track } from 'lwc';
import findRecords from '@salesforce/apex/LookupController.findRecords';

export default class LookupParent extends LightningElement {
    @api fieldName;
    @api objectApiName;
    @api iconname = 'standard:account';
    @track records;
    @track errors;
    @track selectedRecord;
    handleSearch(event){
        console.log('parent');

        const searchValue = event.detail;
        console.log('val',searchValue);
        this.fieldName = 'Name';
        this.objectApiName = 'Account';

        findRecords({
            objectApiName: this.objectApiName,
            fieldName: this.fieldName,
            searchValue:searchValue
        })
        .then(result =>{
            console.log('Results', result);
            this.records = result;
            this.errors = undefined;
        })
        .catch(error => {
            console.log(error);
            this.records = undefined;
            this.errors = error;
        })
    }
    handleSelect(event){
        const accountId = event.detail;
        const selectedRec = this.records.find(account=> account.Id === accountId );
        console.log('Selected Rec',selectedRec);
        this.selectedRecord = selectedRec;
    }
    handleRemove(){
        this.selectedRecord = undefined;
        this.errors = undefined;
        this.records = undefined;
    }
}