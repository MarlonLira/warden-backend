import { HttpCode } from '../enums/Http';

//http://weblink.com.br/blog/o-que-e-http-codigos-erros-http
function GetHttpMessage(value : HttpCode, entitie = null, result = null){
  var result;
    switch(value){
      case HttpCode.Continue :{
        result = "Continua";
        break;
      }
      case HttpCode.Processing :{
        result = "Processando";
        break;
      }
      case HttpCode.Ok :{
        result = {
          code: 200,
          message: `${entitie.name} Ok`,
          result: result
        };
        break;
      }
      case HttpCode.Created :{
        result = {
          code: 201,
          message: `${entitie.name} Criado/Gerado`,
          result: result
        };
        break;
      }
      case HttpCode.Accepted :{
        result = `${entitie.name} Aceito`;
        break;
      }
      case HttpCode.Found :{
        result = {
          code: 302,
          message: `${entitie.name} Encontrato`,
          result: result
        };
        break;
      }
      case HttpCode.Bad_Request :{
        result = {
          code: 400,
          message: `${entitie.name} Solicitação Inválida`,
          result: result
        };
        break;
      }
      case HttpCode.Unauthorized :{
        break;
      }
      case HttpCode.Forbidden :{
        break;
      }
      case HttpCode.Not_Found :{
        result = {
          code: 404,
          message: `${entitie.name} Not Found`,
          result: result
        };
        break;
      }
      case HttpCode.Expectation_Failed :{
        break;
      }
      case HttpCode.Internal_Server_Error :{
        result = {
          code: 500,
          message:  `${entitie.name} Internal Server Error`,
          result: result
        };
        break;
      }
      case HttpCode.Not_Implemented :{
        break;
      }
      case HttpCode.Bad_Gateway :{
        break;
      }
      case HttpCode.Service_Unavailable :{
        break;
      }
      default :{
        result = {
          code: 500,
          message:  `${entitie.name} Internal Server Error`,
          result: result
        };
      }
    }
    return result;
}

export { GetHttpMessage };