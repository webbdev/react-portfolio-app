import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import Home from './pages/Home'
import About from './pages/About'
import Project, {projectLoader} from './pages/Project'
import NotFound from './pages/NotFound'


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayouts />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/:id' loader={projectLoader} element={<Project />} />
        <Route path='/not' element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
