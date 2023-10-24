let buyer = {
  name: "Uros",
  lastName: "Nerandzic",
  drivingLicence: "true",
  wallet: 350000, //E
  pickCar: function () {
    let errorMessage = {};
    let carBrand = getData("car-brand");
    errorMessage.brand = [];
    //required
    if (requiredField(carBrand)) {
      errorMessage.brand.push(requiredField(carBrand));
    }
    //check errors
    checkErrors(errorMessage.brand, "car-brand", "car-brand-error");

    //take value
    let carConsumption = getData("car-consumption");
    errorMessage.consumption = [];
    //required
    if (requiredField(carConsumption)) {
      errorMessage.consumption.push(carConsumption(consumption));
    }
    //check errors
    checkErrors(
      errorMessage.consumption,
      "car-consumption",
      "car-consumption-error"
    );

    // take a value
    let carColor = getData("car-color");
    errorMessage.color = [];
    //required
    if (requiredField(carColor)) {
      errorMessage.color.push(requiredField(carColor));
    }
    //check errors
    checkErrors(errorMessage.color, "car-color", "car-color-error");

    // take a value
    let doorNumber = getData("car-door-number");
    errorMessage.doorNumber = [];
    //required
    if (requiredField(doorNumber)) {
      errorMessage.doorNumber.push(requiredField(doorNumber));
    }
    //check errors
    checkErrors(
      errorMessage.doorNumber,
      "car-door-number",
      "car-door-number-error"
    );

    if (
      errorMessage.brand.length === 0 &&
      errorMessage.consumption.length === 0 &&
      errorMessage.color.length === 0 &&
      errorMessage.doorNumber.length === 0
    ) {
      sessionStorage.setItem("carBrand", carBrand);
      sessionStorage.setItem("carConsumption", carBrand);
      sessionStorage.setItem("carColor", carBrand);
      sessionStorage.setItem("cardoorNumber", carBrand);
      sessionStorage.setItem("selection", true);

      switch (carBrand) {
        case "fiat":
          sessionStorage.setItem("carPrice", 20000);
          break;
        case "ford":
          sessionStorage.setItem("carPrice", 25000);
          break;
        case "chevrolet":
          sessionStorage.setItem("carPrice", 30000);
          break;
        case "bmw":
          sessionStorage.setItem("carPrice", 35000);
          break;
      }

      car.brand = carBrand;
      car.color = carColor;
      car.consumption = Number(carConsumption);
      car.doorNumber = Number(doorNumber);
      car.model = "img/" + carBrand + "-" + carColor + ".png";
      car.price = sessionStorage.getItem("carPrice");
      //clear value
      clearData("car-brand");
      clearData("car-consumption");
      clearData("car-color");
      clearData("car-door-number");
      document.getElementById("buy-car").classList.add("active");
    }
  },
  buyCar: function () {
    if (this.wallet >= car.price) {
      // buy car
      this.wallet -= car.price;
      document.getElementById("buy-car").classList.add("purchase");
      document
        .getElementById("car")
        .setAttribute("style", 'background-image: url("' + car.model + '")');
      document.getElementById("fuelBar").style.display = "block";
    } else {
      alert("You dont have enought money");
    }
  },
};

let car = {
  brand: sessionStorage.getItem("carBrand"),
  color: sessionStorage.getItem("carColor"),
  consumption: sessionStorage.getItem("carConsumption"),
  doorNumber: sessionStorage.getItem("doorNumber"),
  model:
    "img/" +
    sessionStorage.getItem("carBrand") +
    "-" +
    sessionStorage.getItem("carColor") +
    ".png",
  price: sessionStorage.getItem("carPrice"),
  isStarted: false,
  isMove: false,
  fuel: 100,
  gear: 1,
  position: 0,
  turnOn: function () {
    // check is started
    if (!this.isStarted) {
      // light on
      document.getElementById("light1").classList.add("yellow");
      document.getElementById("light2").classList.add("yellow");
      this.gear = 0;
      //emty fuel
      this.isStarted = setInterval(function () {
        car.emptyTank();
      }, 1000);
      // gear = 0
    } else {
      alert("car is started!!!");
    }
  },
  turnOff: function () {
    // is off
    if (this.isStarted) {
      //turn light
      document.getElementById("light1").classList.remove("yellow");
      document.getElementById("light2").classList.remove("yellow");
      //stop car
      this.stop();

      clearInterval(this.isStarted);
      this.isStarted = false;
    } else {
      alert("car is off!!!");
    }

    //stop empty fuel
  },
  emptyTank: function () {
    if (this.fuel > 0) {
      // fuel > 0 -> empty
      this.fuel -= this.consumption / 100;
      document.getElementById("currenFuelState").style.width = this.fuel + "%";
    } else {
      //turn off
      this.turnOff();
      //ask to fill
      this.fillTank();
    }

    // === 0
  },
  fillTank: function () {
    //is off
    if (!this.isStarted) {
      let amount = prompt("Amount?");

      if (amount === null) {
        return;
      }
      if (isNaN(amount)) {
        alert("Please enter a valid number");
        this.fillTank();
      }
      if (Number(amount) + this.fuel > 100) {
        this.fuel = 100;
        document.getElementById("currenFuelState").style.width =
          this.fuel + "%";
      } else {
        this.fuel += Number(amount);
        document.getElementById("currenFuelState").style.width =
          this.fuel + "%";
      }
    } else {
      alert("Please turnOff the car!!!");
    }
    //is off

    //fill
  },
  go: function () {
    // is on
    if (this.isStarted) {
      //gear = 1
      this.gear = 1;
      //isMove =
      if (this.isMove) {
        alert("Car is moving");
      } else {
        this.isMove = setInterval(function () {
          car.position += car.gear;
          document.getElementById("car").style.left = car.position + "%";
        }, 500);
      }
    } else {
      //else alert
      alert("Please turn on the car!!!");
    }
  },
  stop: function () {
    //isMove = false
    if (this.isMove) {
      //gear = 0
      this.gear = 0;
      //stop the car
      clearInterval(this.isMove);
      //zaustavljen ali opet moze da se pokrene!!!
      this.isMove = false;
    } else {
      alert("Car is stopped!!!");
    }
  },
  changeTrace: function () {
    // is move
    if (this.isMove) {
      //light1   signal
      //light2   remove signal
      document.getElementById("light1").classList.add("signal");
      document.getElementById("light2").classList.remove("signal");
      //bottom 120px sa migavcem prvo pa onda preticanje
      setTimeout(function () {
        document.getElementById("car").style.bottom = "120px";
      }, 1000);
    } else {
      alert("Move the car first!!!");
    }
  },
  backtoTrace: function () {
    // is move
    if (this.isMove) {
      //bottom 20px sa migavcem prvo pa onda preticanje
      setTimeout(function () {
        document.getElementById("car").style.bottom = "20px";
      }, 1000);
      //light2   signal
      document.getElementById("light2").classList.add("signal");
      //light1   remove signal
      document.getElementById("light1").classList.remove("signal");
    } else {
      alert("Move the car first!!!!");
    }
  },

  speedUp: function () {
    // change gear
    if (this.gear === -1) {
      this.gear = 1;
      return;
    }
    if (this.gear < 6) {
      this.gear++;
    }
  },

  speedDown: function () {
    //change gear
    if (this.gear > 0) {
      this.gear--;
    }
  },
  reverse: function () {
    //gear = -1
    this.gear = -1;
  },
};

//HELPER FUNCTIONS

function getData(elementID) {
  return document.getElementById(elementID).value.trim();
}

function requiredField(data) {
  if (data.length === 0) {
    return "Please select one of the given options.";
  } else {
    return false;
  }
}
function checkErrors(error, elementID, errorID) {
  if (error.length > 0) {
    document.getElementById(elementID).classList.add("error");
    document.getElementById(errorID).innerText = error.join("\n");
  } else {
    document.getElementById(elementID).classList.remove("error");
    document.getElementById(errorID).innerText = "";
  }
}
function clearData(elementID) {
  document.getElementById(elementID).value = "";
}

if (sessionStorage.getItem("slection")) {
  document.getElementById("buy-car").classList.add("active");
} else {
  document.getElementById("buy-car").classList.remove("active");
}
