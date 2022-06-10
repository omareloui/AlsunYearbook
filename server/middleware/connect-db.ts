// THIS MIDDLEWARE HAS TO BE AT THE END ON THE MIDDLEWARE FOLDER
import { connect } from "server/db";

export default defineEventHandler(connect);
