import { useId } from 'react'

import { SearchIcon } from 'lucide-react'

import { Input } from '~/components/ui/input'

const Search = () => {
  const id = useId()

  return (
    <div className='w-full max-w-sm space-y-2'>
      <div className='relative cursor-pointer'>
        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
          <SearchIcon className='size-4' />
          <span className='sr-only'>Search</span>
        </div>
        <Input
          id={id}
          type='search'
          placeholder='Search...'
          className='peer cursor-pointer rounded-full pl-9 pr-16 hover:border-ring/50 hover:ring-2 hover:ring-ring/20 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
        />
        <span className='text-muted-foreground/50 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-xs'>
          ⌘K
        </span>
      </div>
    </div>
  )
}

export default Search
