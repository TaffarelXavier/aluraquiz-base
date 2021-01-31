import React, { useState } from 'react'
import { NextPage } from 'next'
import { Widget, QuizWidgetHeader, QuizWidgetContent } from '../Widget'
import { motion } from 'framer-motion'

interface ILoadingPage {
  title: string
}

const LoadingScreen: NextPage<ILoadingPage> = ({ children, title }) => {
  return (
    <>
      <Widget
        style={{
          background:'rgba(0,0,0,0.9)',
          backgroundPosition: 'center center'
        }}
      >
        <QuizWidgetHeader>{title}</QuizWidgetHeader>
        <QuizWidgetContent>{children}</QuizWidgetContent>
      </Widget>
    </>
  )
}

export default LoadingScreen
