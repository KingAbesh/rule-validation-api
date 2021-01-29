import "module-alias/register";
import config from "@config";
import app from "./app";
import logger from "./logger";

const apiURL = `/api/${config().version}`;
const { port } = config();

app.listen(port, function onListen() {

	logger.info(`Server is up and running at ${apiURL} on port ${port}`);
	
});
