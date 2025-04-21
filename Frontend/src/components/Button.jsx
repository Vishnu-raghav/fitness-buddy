export default function Button({
    children,
    type="button",
    className,
    ...props
}){
    return(
        <button className={`px-2 py-2 rounded-lg text-white bg-black ${className}`}{...props}>
          {children}
        </button>
    )
}