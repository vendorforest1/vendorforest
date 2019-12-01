import { expect } from "chai";
import request from "request";
let $HOST = "http://localhost:8080";

describe("Login SignUp API", function() {
  describe("successful", function() {
    it("returns status 200", function() {
      request($HOST + "/test", function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

    it("redirects to the right component return OK", function() {
      request(HOST + "/test", function(error, response, body) {
        env.MODE === "development" && console.log(body);
        expect(body).to.equal("OK");
      });
    });
  });

  describe("failure", function() {
    it("returns status 500", function() {
      request(HOST + "/test", function(error, response, body) {
        expect(response.statusCode).to.equal(500);
      });
    });

    it("redirects to index component", function() {
      request(HOST + "/test", function(error, response, body) {
        expect(body).to.equal("OK");
      });
    });
  });
});
