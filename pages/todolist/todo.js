Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    logs: [],
    autoFocus: true,
    leftCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("  onLoand ==============")
    this.load()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("  onReady ==============")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("  onShow ==============")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("  onHide ==============")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload ==============")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("  onPullDownRefresh ==============")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("  onReachBottom ==============")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("  onShareAppMessage ==============")
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    }
    var logs = wx.getStorageSync('todo_logs')
    if (logs) {
      this.setData({ logs: logs })
    }
  },

  // keyChangeHandle: function (event) {
  //   console.log("  keyChangeHandle ==============" + event.detail.value)
  //   this.setData({ keywords: event.detail.value })
  // },

  //失去焦点
  resignFocus: function (event) {
    console.log("  resignFocus ==============")
    //焦点开关
    this.setData({ 
      keywords: event.detail.value,
      autoFocus: false
    })
  },

  addTodoHandle: function (e) {

    if (!this.data.keywords || !this.data.keywords.trim()) return

    console.log("  addTodoHandle ===========data===" + this.data.keywords)

    var todos = this.data.todos
    todos.push({
      name: this.data.keywords,
      completed: false
    })

    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      completed: false
    })

    this.data.keywords = ''
    this.setData({
      keywords: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
      logs: logs
    })
    this.save()
  },

  save: function () {
    console.log("  save ==============")
    wx.setStorageSync('todo_list', this.data.todos)
    wx.setStorageSync('todo_logs', this.data.logs)
  },
  //获取焦点
  activeFocus: function (event) {
    console.log("  activeFocus ==============")
    this.setData({
      autoFocus: true
    });
  },

  removeTodoHandle: function (e) {
    console.log("  removeTodoHandle ==============")

      var index = e.currentTarget.dataset.index
      var todos = this.data.todos
      var remove = todos.splice(index, 1)[0]
      var logs = this.data.logs
      logs.push({
        timestamp: new Date(),
        action: 'Remove',
        name: remove.name
      })

      this.setData({
        todos: todos,
        leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
        logs: logs
      })

      this.save()
  },

  toggleAllHandle: function (e) {

    console.log("  toggleAllHandle ==============")

    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: this.data.allCompleted ? 'Finish' : 'Restart',
      name: 'All todos'
    })
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      logs: logs
    })
    this.save()
  },

  clearCompletedHandle: function (e) {
    console.log("  clearCompletedHandle ==============")

    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: 'Clear',
      name: 'Completed todo'
    })
    this.setData({ todos: remains, logs: logs })
    this.save()
  },


  toggleTodoHandle: function (e) {
    console.log("  toggleTodoHandle ==============")

    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: todos[index].completed ? 'Finish' : 'Restart',
      name: todos[index].name
    })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
      logs: logs
    })
    this.save()
  }
})