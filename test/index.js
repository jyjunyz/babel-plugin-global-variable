const IMPORT_TPL = `
import * as _ from 'lodash' // no effect
import Vue from 'vue'
import * as element from 'element-ui'
import { Button, Form } from 'element-ui'
import { mapGetters, mapActions as action } from 'vuex' // destructuring
import Vuex, { mapState } from 'vuex'
import { registerBiz } from 'SodaApp'
`

// import test from 'ava'
// import { transform, transformFileSync } from 'babel-core'
// import { resolve } from 'path'

const test = require('ava')
const babel = require('babel-core')
const plugin = require('../lib')
const { readFileSync } = require('fs')
const path = require('path')

test(t => {
  let { code } = babel.transform(IMPORT_TPL, {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          whiteList: ['vue', 'vuex', 'element-ui'],
          namespace: 'SodaApp' // optional
        }
      ]
    ]
  })
  t.is(code.trim(), readFileSync(path.resolve(__dirname, './features/expected.js'), 'utf8'))
})

