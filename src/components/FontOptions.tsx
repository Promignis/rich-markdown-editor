import * as React from "react";


export const FontOptions = () => {

    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72]
    return (
        <>
            <div>
                <form>
                <select name="fonts">
                    {fontSizes.map(val => {
                            return(<option value={val}>{val}</option>)
                    })}
                </select>
                </form>
            </div>
        </>
    )
}