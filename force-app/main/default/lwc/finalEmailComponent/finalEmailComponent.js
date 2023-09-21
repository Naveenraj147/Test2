import { LightningElement, track } from 'lwc';

import findRecords from '@salesforce/apex/ExternalFileShareCtrl.findRecords';
import getSubandBody from '@salesforce/apex/ExternalFileShareCtrl.getSubandBody';
export default class SingleLookup extends LightningElement {
    @track records;
    @track errors;
    @track selectedRecord;
    subject;
    body;

    value = 'English';

    get options() {
        return [
            { label: 'English', value: 'English' },
            { label: 'Spanish', value: 'Spanish' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;

        this.changeTemplate();
    }

    changeTemplate(){
        getSubandBody({
            value:this.value
        })
        .then(result =>{
            console.log('Email', result.subject);
            this.subject = result.subject;
            this.body = result.body;
        })
        .catch(error => {
            console.log(error);
        })
    }



    

    handleSearch(event){
        console.log('parent');
        const searchValue = event.target.value;
        
        console.log('val',searchValue);
        this.fieldName = 'Name';
        this.objectApiName = 'Account';
       
        findRecords({
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