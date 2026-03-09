import React from 'react'

const Footer = ({completedTasksCount=0, activeTasksCount=0}) => {
  return (
    <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className='text-center'> 
        <p className='text-sm text-foreground'>
          {completedTasksCount > 0 && (
            <>
              🤩 Chúc mừng bạn đã hoàn thành {completedTasksCount} ghi chú.
              {activeTasksCount > 0 && `, còn ${activeTasksCount} ghi chú nữa cần được hoàn thành, cố lên nào!!!`}
            </>
          )}
          {completedTasksCount === 0 && activeTasksCount >0 && (
            <>
              Hãy bắt đầu thực hiện {activeTasksCount} ghi chú còn lại nào!
            </>
          )}

        </p>
      </div>
    )}
    </>
  )
}

export default Footer