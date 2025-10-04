'use client'
import Button from '../Button'

const ContactForm = () => {
  return (
      <form className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border border-gray-300 outline-none focus:outline-head"
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border border-gray-300 outline-none focus:outline-head"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border border-gray-300 outline-none focus:outline-head"
            />
            <textarea
              rows={6}
              placeholder="Message"
              className="w-full rounded-xl px-6 py-3 placeholder:text-sm border border-gray-300 outline-none focus:outline-head"
            />
            <Button className="w-full py-3 bg-transparent rounded-full border-2 border-head text-body hover:bg-first hover:border-first transition-all duration-500 ease-in-out">
              Send
            </Button>
          </form>
  )
}

export default ContactForm