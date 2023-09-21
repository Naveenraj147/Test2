import { LightningElement, track } from 'lwc';

export default class LookupPractice extends LightningElement {
    @track searchVal;

    handelChange(event){
        console.log(event.target.value);
        const value = event.target.value;
        this.searchVal = value;
        console.log(this.searchVal);

        const searchEvent = new CustomEvent(
            'search',
            {
                detail: this.searchVal
            }
        )
           
        console.log(searchEvent);
        this.dispatchEvent(searchEvent);
        console.log('Dispached')
    }
}