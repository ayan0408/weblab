"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
var crypto_1 = __importDefault(require("crypto"));
var encrypt = function (data) {
    var key = "U3VwZXIgY29tcGxleCBwYXNzd29yZA==";
    var cipher = crypto_1.default.createCipheriv("aes256", key, Buffer.alloc(16, 0));
    var encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
};
exports.encrypt = encrypt;
