const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts() {
  await delay(3000);

  return [
    {
      id: 1,
      title: "15 extra Lunch minutes",
      price: 50,
      description: "You know you want it. ",

      image: "/assets/images/clock.png",
      srcLink:
        "https://www.freepik.com/free-photo/wake-watch-background-vintage-hour_1090759.htm#fromView=search&page=1&position=9&uuid=f740c8f6-a39f-45dd-a5c1-62323302d698",
      srcText: "Image by mrsiraphol on Freepik",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Free Lunch",
      price: 100,
      description: "There is such a thing apparently.",
      image: "/assets/images/delicious-appetizer.png",
      srcLink:
        "https://www.freepik.com/free-photo/delicious-appetizer_8743466.htm#fromView=search&page=1&position=5&uuid=9e837278-8549-4b7e-b363-163906335760",
      srcText: "Image by Racool_studio on Freepik",
      rating: {
        rate: 4.1,
        count: 259,
      },
    },
    {
      id: 3,
      title: "1 extra hour of sleep",
      price: 3,
      description: "Still wake up on time guarantee included.",

      image: "/assets/images/sleep.png",
      srcLink:
        "https://www.freepik.com/free-photo/clothes-human-pajamas-white-waking_1151578.htm#fromView=search&page=1&position=3&uuid=ac555011-2231-4ff1-b931-cc80d40eac38",
      srcText: "Image by luis_molinero on Freepik",
      rating: {
        rate: 4.7,
        count: 500,
      },
    },
    {
      id: 4,
      title: "Recruiter Man",
      price: 15,
      description:
        "Just a decent guy to talk to and consult on your job prospects.",

      image: "/assets/images/recruiter.png",
      srcLink:
        "https://www.freepik.com/free-photo/man-making-deal_1142932.htm#fromView=search&page=1&position=5&uuid=98eed738-5c78-4eca-a37a-d1140efc1e50",
      srcText: "Image by luis_molinero on Freepik",
      rating: {
        rate: 2.1,
        count: 430,
      },
    },
    {
      id: 5,
      title: "Printer",
      price: 25,
      description: "Never, breaks, runs out of ink, or malfunctions.",

      image: "/assets/images/printer.png",
      srcLink:
        "https://www.freepik.com/free-photo/printer-with-white-sheets_977954.htm#fromView=search&page=1&position=6&uuid=3b068fdd-52a8-406e-8519-ebd7597f02f4",
      srcText: "Image by jannoon028 on Freepik",
      rating: {
        rate: 4.6,
        count: 400,
      },
    },
    {
      id: 6,
      title: "Parking Space",
      price: 250,
      description:
        "Always available, no one ever takes it. Practically free real estate.",
      srcLink:
        "https://www.freepik.com/free-vector/parking-sign-flat-style_79635147.htm#fromView=search&page=1&position=0&uuid=f2eb231d-292b-4b82-810c-243b93d04ec0",
      srcText: "Image by juicy_fish on Freepik",
      image: "/assets/images/parking.png",
      rating: {
        rate: 3.9,
        count: 70,
      },
    },
  ];
}
