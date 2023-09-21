import { LightningElement } from 'lwc';
export default class RichTextExample extends LightningElement {

    myVal = '**Hello**';
    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
    ];


    handleChange(event) {
        this.myVal = event.target.value;
    }
    handleClick(event){
        if(event.target.name == 'Button 1'){
            this.myVal = '**Hello** Button 1';
        }
        if(event.target.name =='Button 2'){
            this.myVal = '**Hello** Button 2';
        }
    }
}