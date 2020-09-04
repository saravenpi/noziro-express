module.exports = function(cron, total, hour, day) {


cron.schedule('0 0 * * *', () => {
  console.log('DAILY TASKKKKK');


total.findOne({ description: "haha" }).exec(function(err, ttt) {

 totalhour = ttt.views;

  hour.findOne({ description: "hoho" }).exec(function(err, woof) {

    function lastdaycount() {

    var array = [woof.stats, totalhour]
    var total=0;
    for(var i in array) { total += array[i]; }
    return total


    }
    wf = lastdaycount()

    day.findOne({ description: "hihi" }).exec(function(err, doc) {

      dt = doc.stats;
      doc.stats = [dt[1], dt[2], dt[3], dt[4], dt[5], wf];
      doc.save();


  });


});

});

}, {
   scheduled: true,
   timezone: "Europe/Paris"
 });

};
