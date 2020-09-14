module.exports = function(cron, total, hour, day, truetotal, truehour, trueday, dayuser, request) {


cron.schedule('1 0 * * *', () => {
  console.log('DAILY TASKKKKK');

  request.post(process.env.DAYHOOK, {
    "headers":{
      'Content-Type': 'application/json'
    },
    "body": JSON.stringify({

    "username": "DAY SCHEDULE",
    "content": "The daily automated function has been executed"



  })
  },function optionalCallback(err, httpResponse, body) {
  if (err) {
  return console.error('request failed:', err);
  }
  console.log('request successful!  Server responded with:', body);
  });


total.findOne({ description: "haha" }).exec(function(err, ttt) {

 totalhour = ttt.views;

  hour.findOne({ description: "hoho" }).exec(function(err, woof) {

    function lastdaycount() {

    var array = woof.stats
    array.push(totalhour)
    var totalday=0;
    for(var i in array) { totalday += array[i]; }
    return totalday


    }
    wf = lastdaycount();

    day.findOne({ description: "hihi" }).exec(function(err, doc) {

      dt = doc.stats;
      doc.stats = [dt[1], dt[2], dt[3], dt[4], dt[5], wf];
      doc.save();


  });


});

});





truetotal.findOne({ description: "huhu" }).exec(function(err, ttt2) {

 totalhour2 = ttt2.views;

  truehour.findOne({ description: "hoho" }).exec(function(err, woof2) {

    function lastdaycount() {

    var array2 = woof2.stats
    array2.push(totalhour)
    var totalday2=0;
    for(var i in array2) { totalday2 += array2[i]; }
    return totalday2


    }
    wf2 = lastdaycount();

    trueday.findOne({ description: "hyhy" }).exec(function(err, doc2) {

      dt = doc2.stats;
      doc2.stats = [dt[1], dt[2], dt[3], dt[4], dt[5], wf2];
      doc2.save();
        dayuser.findOne({ description: "hehe" }).exec(function(err, yay) {
          yay.users = []
           yay.save();
        });

  });


});

});
}, {
   scheduled: true,
   timezone: "Europe/Paris"
 });

};
