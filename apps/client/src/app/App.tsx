import { SignUpFormSchema } from "@repo/validators"
import AppRouter from "./AppRouter"
import { NICKNAME_MAX } from "@repo/constants"
import { Toaster } from "sonner"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@src/hooks/useRedux"
import { getSession } from "@src/features/auth/slice/authSlice"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@src/components/ui/empty"

function App() {
  const dispatch  = useAppDispatch();
  const { isSessionPending } = useAppSelector(state => state.auth)

  const checkSession = async() => {
    await dispatch(getSession());
  }

  useEffect(() => {
    checkSession();
  }, [])

  if(isSessionPending){
    return <div>
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            Looking for session...
          </EmptyTitle>
          <EmptyDescription>
            This should only take a few seconds...
          </EmptyDescription>
        </EmptyHeader>

      </Empty>
    </div>
  }
 

  return (
    <div>
      <Toaster position="top-center" />
      <AppRouter />
    </div>
  )
}

export default App
