/**
* @Author: AuthorName
* @Date:   2016-12-31T20:55:00+08:00
* @Email:  Email
* @Project: projectName
* @Filename: server-address.js
* @Last modified by:   AuthorName
* @Last modified time: 2017-01-02T14:44:08+08:00
* @License: tree
*/

const navs = {
  top: '置顶',
  good: '精华',
  ask: '问答',
  share: '分享',
  job: '招聘'
};

const articleCategory = {
  ask: '问答',
  share: '分享',
  job: '招聘'
};

const http = 'https://cnodejs.org/api/v1/';

const API = {
  interface: http,
  getUserById: `${http}user/`,
  topics: `${http}topics`,
  topicCollect: `${http}topic_collect/`,
  collect: `${http}topic_collect/collect`,
  deCollect: `${http}topic_collect/de_collect`,
  topic: `${http}topic/`,
  topicUpdate: `${http}topics/update`,
  replyUps: `${http}reply/`,
  messageCount: `${http}message/count`,
  messages: `${http}messages`,
  messageMarkAll: `${http}message/mark_all`
};

module.exports = { API:"API", articleTypeMap:"articleTypeMap", articleCategory:"articleCategory" };
