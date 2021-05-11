import { useState, useEffect } from "react"
import car from './car.png'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const App = () => {

  const useStyles = makeStyles((theme) => ({
    textField: {
      margin: "10px 0",
      width: "30%",
      height: "50px"
    },
    app: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    button: {
      margin: "10px"
    },
    heading: {
      textShadow: "1px 1px red"
    },
    table: {
      width: "600px"
    },
    tableCell: {
      textAlign: "center"
    }
  }));

  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [hp, setHp] = useState("");
  const [isValid, setIsValid] = useState(false)
  const classes = useStyles();

  const addCarHandler = () => {
    // alert("button clicked!");
    const oldCars = [...cars];
    const newCar = {
      brand,
      model,
      year,
      hp,
      id: Math.floor(Math.random() * 1000)
    }

    const newCars = oldCars.concat(newCar);

    if (brand === "" || model === "" || year === "" || hp === "") {
      alert("fields cannot be blank !")
      setIsValid(true)
    } else {
      const newCars = oldCars.concat(newCar);
      setIsValid(false)
    }

    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));

    setBrand("");
    setModel("");
    setYear("");
    setHp("");
  };

  const deleteCarHandler = (id) => {
    const oldCars = [...cars];
    const newCars = oldCars.filter((car) => car.id !== id);
    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));
  }

  useEffect(() => {
    const localStorageCars = JSON.parse(localStorage.getItem("cars"))
    setCars(localStorageCars)
  }, [setCars])

  return (
    <div className={classes.app}>
      <img src={car} style={{ width: "300px" }} alt="#" />
      <h1 className={classes.heading}>Car Registration App</h1>
      <TextField
        className={classes.textField}
        label="Brand"
        value={brand}
        error={isValid}
        onChange={(e) => setBrand(e.target.value)}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        label="Model"
        value={model}
        error={isValid}
        onChange={(e) => setModel(e.target.value)}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        label="Year"
        value={year}
        error={isValid}
        onChange={(e) => setYear(e.target.value)}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        label="HP"
        value={hp}
        error={isValid}
        onChange={(e) => setHp(e.target.value)}
        variant="outlined"
      />
      <Button className={classes.button}
        variant="contained"
        color="secondary"
        onClick={addCarHandler}>
        Add a car
      </Button>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Brand</TableCell>
            <TableCell className={classes.tableCell}>Model</TableCell>
            <TableCell className={classes.tableCell}>Year</TableCell>
            <TableCell className={classes.tableCell}>Horse Power</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car, index) => (
            <TableRow key={index} onClick={() => deleteCarHandler(car.id)}>
              <TableCell className={classes.tableCell}>{car.brand}</TableCell>
              <TableCell className={classes.tableCell}>{car.model}</TableCell>
              <TableCell className={classes.tableCell}>{car.year}</TableCell>
              <TableCell className={classes.tableCell}>{car.hp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
