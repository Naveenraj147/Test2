import { LightningElement, api, track } from 'lwc';

import findRecords from '@salesforce/apex/LookupController.findRecords';

export default class SingleLookup extends LightningElement {
    @api fieldName= 'Name'
    @api objectApiName= 'Account'
    @api iconname = 'standard:account';
    @track records;
    @track errors;
    @track selectedRecord;

    

    handleSearch(event){
        console.log('parent');
        const searchValue = event.target.value;
        
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
        if(searchValue == ''){
            this.records = undefined;
        }
    }

    handleSelect(event){
        console.log('eve',event.currentTarget.dataset.id)
      
        const accountId = event.currentTarget.dataset.id;
        const selectedRec = this.records.find(account=> account.Id === accountId );
        console.log('Selected Rec',selectedRec);
        this.selectedRecord = selectedRec;

        const eve = new CustomEvent(
            'recid',
            {detail:this.selectedRecord
        })
        this.dispatchEvent(eve);
    }
    handleRemove(){
        this.selectedRecord = undefined;
        this.errors = undefined;
        this.records = undefined;

        const eve = new CustomEvent(
            'recid',
            {detail:this.selectedRecord
        })
        this.dispatchEvent(eve);
    }
}