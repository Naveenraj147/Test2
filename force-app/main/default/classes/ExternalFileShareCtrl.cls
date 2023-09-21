public with sharing class ExternalFileShareCtrl {
    public static List<Account> findRecords( String searchValue){
        String key = '%' + searchValue + '%';
          if(searchValue == ''){
              return null;
          }
          List<Account> accList = [Select Id, Name From Account Where Name Like :key];
        return accList;
      }
}