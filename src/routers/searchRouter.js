import { Router } from "express";
import { pesquisa,hashtag,hashtagsTrending,buscarUsuario} from "../controllers/Timeline/search.js";

const SearchRouter = Router();

SearchRouter.get('/timeline', pesquisa)
SearchRouter.get('/hashtag', hashtag)
SearchRouter.get('/hashtagsTrending',hashtagsTrending)
SearchRouter.get('/user/:id', buscarUsuario)

export default SearchRouter;