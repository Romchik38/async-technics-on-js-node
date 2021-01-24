'use strict';

const Node = function(list, data) {
  this.list = list;
  this.data = data;
  this.prev = null;
  this.next = null;
};

const List = function() {
  this.first = null;
  this.last = null;
};

List.prototype.push = function(...data) {
  const node = new Node(this, data);
  node.prev = this.last;
  this.last = node;
  if (this.first === null) this.first = node;
  else node.prev.next = node;
  return this;
};

List.prototype.pop = function() {
  if (this.first === null) return;
  const node = this.last;
  if (this.first === this.last) {
    this.first = null;
    this.last = null;
  } else {
    this.last = node.prev;
    this.last.next = null;
  }
  node.next = null;
  node.prev = null;
  node.list = null;
  return node.data;
};

List.prototype.unshift = function(data) {
  const node = new Node(this, data);
  node.next = this.first;
  this.first = node;
  if (this.last === null) this.last = node;
  else node.next.prev = node;
};

List.prototype.shift = function() {
  if (this.last === null) return;
  const node = this.first;
  if (this.first === this.last) {
    this.first = null;
    this.last = null;
  } else {
    this.first = node.next;
    this.first.prev = null;
  }
  node.next = null;
  node.prev = null;
  node.list = null;
  return node.data;
};

module.exports = List;
