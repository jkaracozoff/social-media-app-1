let BASE_URL = "https://amygdala.herokuapp.com/amygdala/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000/";
}

export { BASE_URL };
