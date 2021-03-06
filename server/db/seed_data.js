use team_extra_data;
db.dropDatabase()
db.teams.insert([
  {
    name: "AFC Bournemouth",
    stadiumName: "Dean Court",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/AFC-Bournemouth-dean-court.jpg",
    latLng: [
      50.7352306,
      -1.8382791
    ],
    ticketLink: "https://www.afcb.co.uk/tickets"
  },
  {
    name: "Arsenal FC",
    stadiumName: "Emirates Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/arsenal-emirates-stadium-aerial.jpg",
    latLng: [
      51.5548885,
      -0.108438
    ],
    ticketLink: "https://www.arsenal.com/tickets"
  },
  {
    name: "Brighton & Hove Albion",
    stadiumName: "Falmer Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/amex-stadium-cover.jpg",
    latLng: [
      50.8615651,
      -0.0837163
    ],
    ticketLink: "https://www.seagullstickets.com/"
  },
  {
    name: "Burnley FC",
    stadiumName: "Turf Moor",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/turf-moor-cover.jpg",
    latLng: [
      53.7890244,
      -2.2301736
    ],
    ticketLink: "https://www.burnleyfootballclub.com/tickets/"
  },
  {
    name: "Chelsea FC",
    stadiumName: "Stamford Bridge",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/stamford-bridge-cover.jpg",
    latLng: [
      51.481663,
      -0.1909565
    ],
    ticketLink: "http://www.chelseafc.com/tickets-membership/tickets-home.html"
  },
  {
    name: "Crystal Palace FC",
    stadiumName: "Selhurst Park",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/selhurst-park-cover.jpg",
    latLng: [
      51.3983261,
      -0.0865955
    ],
    ticketLink: "https://www.cpfc.co.uk/tickets/"
  },
  {
    name: "Everton FC",
    stadiumName: "Goodison Park",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/goodison-park-cover.jpg",
    latLng: [
      53.438787,
      -2.9663193
    ],
    ticketLink: "http://www.evertonfc.com/ticket-news"
  },
  {
    name: "Huddersfield Town",
    stadiumName: "Kirklees Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/john-smiths-stadium-huddersfield.jpg",
    latLng: [
      53.6542822,
      -1.7682517
    ],
    ticketLink: "https://www.htafc.com/tickets/"
  },
  {
    name: "Leicester City FC",
    stadiumName: "King Power Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/leicester-king-power-stadium.jpg",
    latLng: [
      52.6203662,
      -1.1421895
    ],
    ticketLink: "https://tickets.lcfc.com/default.aspx"
  },
  {
    name: "Liverpool FC",
    stadiumName: "Anfield",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/anfield-stadium-guide.jpg",
    latLng: [
      53.4308294,
      -2.96083
    ],
    ticketLink: "http://www.liverpoolfc.com/tickets/tickets-availability"
  },
  {
    name: "Manchester City FC",
    stadiumName: "Etihad Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/etihad-cover.jpg",
    latLng: [
      53.4831381,
      -2.2003953
    ],
    ticketLink: "https://tickets.mancity.com/"
  },
  {
    name: "Manchester United FC",
    stadiumName: "Old Trafford",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/old-trafford-cover.jpg",
    latLng: [
      53.4630589,
      -2.2913401
    ],
    ticketLink: "https://tickets.mancity.com/"
  },
  {
    name: "Newcastle United FC",
    stadiumName: "St. James Park",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/st-james-park-cover.jpg",
    latLng: [
      54.975556,
      -1.621667
    ],
    ticketLink: "https://tickets.nufc.co.uk/"
  },
  {
    name: "Southampton FC",
    stadiumName: "St Mary's Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/St.jpg",
    latLng: [
      50.9058218,
      -1.390954
    ],
    ticketLink: "https://southamptonfc.com/tickets/match-tickets"
  },
  {
    name: "Stoke City FC",
    stadiumName: "bet365 Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/britannia-stadium-cover.jpg",
    latLng: [
      52.9881046,
      -2.1764298
    ],
    ticketLink: "http://www.stokecityfc.com/tickets"
  },
  {
    name: "Swansea City FC",
    stadiumName: "Liberty Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/08/liberty-stadium-guide.jpg",
    latLng: [
      51.6427499,
      -3.9345855
    ],
    ticketLink: "https://www.eticketing.co.uk/swanstickets"
  },
  {
    name: "Tottenham Hotspur FC",
    stadiumName: "Wembley Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/white-hart-lane-cover.jpg",
    latLng: [
      51.6032123,
      -0.0657389
    ],
    ticketLink: "https://www.eticketing.co.uk/tottenhamhotspur/Events/Index"
  },
  {
    name: "Watford FC",
    stadiumName: "Vicarage Road",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/vicarage-road-cover.jpg",
    latLng: [
      51.6499828,
      -0.4016876
    ],
    ticketLink: "https://www.eticketing.co.uk/watfordfc/default.aspx"
  },
  {
    name: "West Bromwich Albion FC",
    stadiumName: "The Hawthorns",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2015/02/hawthorns-stadium-cover.jpg",
    latLng: [
      52.509038,
      -1.963938
    ],
    ticketLink: "https://www.wba.co.uk/tickets/"
  },
  {
    name: "West Ham United FC",
    stadiumName: "London Stadium",
    stadiumPicture: "https://footballtripper.com/wp-content/uploads/2014/07/west-ham-olympic-stadium-cgi-render.jpg",
    latLng: [
      51.5387095,
      -0.0166037
    ],
    ticketLink: "https://www.whufc.com/tickets/match-tickets"
  }
])

db.tableData.insert({
  standing: [
    {
      "position": 1,
      "teamName": "Manchester City FC",
      "playedGames": 10,
      "points": 28,
      "goalDifference": 29
    },
    {
      "position": 2,
      "teamName": "Manchester United FC",
      "playedGames": 10,
      "points": 23,
      "goalDifference": 19,
    }
  ]
})
