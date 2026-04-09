import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import About from './pages/About'
import Project, { projectLoader } from './pages/Project'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayouts />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/:id' loader={projectLoader} element={<Project />} />
      <Route path='/not' element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
)

const App = () => {
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  )
}

export default App