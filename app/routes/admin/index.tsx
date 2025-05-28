console.log('[admin/index.tsx] File loaded');
import { createRoute } from 'honox/factory'
import EmployeeForm from '../../islands/form'
import { findAllDepartments, findAllLocations } from '../../db'

console.log('[admin/index.tsx] createRoute function type:', typeof createRoute);
console.log('[admin/index.tsx] Before calling createRoute');
export default createRoute(async (c) => {
  console.log('[admin/index.tsx] Route handler started')
  try {
    console.log('[admin/index.tsx] Before findAllLocations')
    const locations = await findAllLocations(c.env.DB)
    console.log('[admin/index.tsx] After findAllLocations, locations:', locations)
    console.log('[admin/index.tsx] Before findAllDepartments')
    const departments = await findAllDepartments(c.env.DB)
    console.log('[admin/index.tsx] After findAllDepartments, departments:', departments)
    return c.render(
      <EmployeeForm locations={locations} departments={departments} />
    )
  } catch (error) {
    console.error('[admin/index.tsx] Error in route handler:', error)
    throw error
  }
})