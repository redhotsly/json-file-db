"use strict";
var assert = require('assert');
var fs = require('fs');
var db = require('../index.js');
var util = require('util');
var dbfile = './test/test.json';

describe('json-file-db', function () {

  afterEach(function () {
    if( fs.existsSync(dbfile)){
      fs.unlinkSync(dbfile);
    }
  });

  describe('when file does not exists', function () {

    it('get() return empty list', function (done) {

      db.get(dbfile, function (err, data) {
        assert.equal(err, undefined);
        assert.equal(data.length, 0);
        done();
      });

    });

    it('put() creates file and stores data', function (done) {

      db.put(dbfile, {id:10}, function (err) {
        assert.equal(err, undefined);
        assert.equal(true, fs.existsSync(dbfile));
        assert.equal('[\n {\n  \"id\": 10\n }\n]', fs.readFileSync(dbfile, 'utf-8'));
        done();
      });

    });

    it('delete() does not fail', function (done) {

      db.delete(dbfile, {id:10}, function (err) {
        assert.equal(err, undefined);

        shopify.github.oi/dashing


        done();
      });

    });

  });

  describe('when file is empty', function () {

    beforeEach(function () {
      fs.writeFileSync(dbfile, '', 'utf-8');
    });

    it('get() return empty list', function (done) {

      db.get(dbfile, function (err, data) {
        assert.equal(err, undefined);
        assert.equal(data.length, 0);
        done();
      });

    });

  });

  describe('when file contain an empty array', function () {

    beforeEach(function () {
      fs.writeFileSync(dbfile, '[]', 'utf-8');
    });

    it('get() return empty list', function (done) {

      db.get(dbfile, function (err, data) {
        assert.equal(err, undefined);
        assert.equal(data.length, 0);
        done();
      });

    });

  });


  describe('when file has docs', function () {

    beforeEach(function () {
      fs.writeFileSync(dbfile, '[{"id":10},{"id":11}]', 'utf-8');
    });

    it('get() return all docs', function (done) {

      db.get(dbfile, function (err, data) {
        assert.equal(err, undefined);
        assert.equal(data.length, 2);
        assert.equal(data[0].id, 10);
        assert.equal(data[1].id, 11);
        done();
      });

    });

    it('delete() delete matching docs', function (done) {

      db.delete(dbfile, 10, function (err) {
        assert.equal(err, undefined);
        assert.equal(true, fs.existsSync(dbfile));
        assert.equal('[\n {\n  \"id\": 11\n }\n]', fs.readFileSync(dbfile, 'utf-8'));
        done();
      });

    });

    it('put() updates existing doc and leaves other unchanged', function (done) {

      db.put(dbfile, {id:10, attr1:100}, function (err) {
        assert.equal(err, undefined);
        assert.equal(true, fs.existsSync(dbfile));
        assert.equal('[\n {\n  \"id\": 10,\n  \"attr1\": 100\n },\n {\n  \"id\": 11\n }\n]', fs.readFileSync(dbfile, 'utf-8'));
        done();
      });

    });

  });

});