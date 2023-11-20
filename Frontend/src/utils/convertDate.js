


const getDate  = function(date){

    let arr = date.split('-');
    let month ='';

    switch (arr[1]) {
        case '01':
          month = 'Jan';
          break;
        case '02':
          month = 'Feb';
          break;
        case '03':
          month = 'Mar';
          break;
        case '04':
          month = 'Apr';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'Jun';
          break;
        case '07':
          month = 'Jul';
          break;
        case '08':
          month = 'Aug';
          break;
        case '09':
          month = 'Sep';
          break;
        case '10':
          month = 'Oct';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Dec';
          break;
        default:
       
      }
      
    let resultDate = arr[2].substr(0,2) + ' ' + month + ',' +arr[0];
    return resultDate;
}


export default getDate;