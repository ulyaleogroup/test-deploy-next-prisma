import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server'
import { z, ZodError } from "zod";

const User = z.object({
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
});

export async function POST(request: Request) {
    try {
        // const formData = await request.formData();
        // const userInput = User.parse({
        //     email: formData.get('email') as string,
        //     password: formData.get('password') as string,
        //     passwordConfirmation: formData.get('passwordConfirmation') as string
        // });

        const { email, password, passwordConfirmation } = User.parse( await request.json() );

        const existedEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existedEmail) return NextResponse.json({
            status: 400,
            message: "Email already exists"
        }, { status: 400 })

        if (password !== passwordConfirmation) {
            return NextResponse.json({
                status: 422,
                message: 'Password do not match'
            }, {
                status: 422
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        return NextResponse.json({
            status: 201,
            message: "User registered successfully",
            data: user
        }, {
            status: 201
        })

    } catch (error) {
        if (error instanceof ZodError) {
            // Handle Zod validation error
            const errorMessage = error.errors.map(err => err.message).join(', ');
            return NextResponse.json({
                status: 422,
                message: errorMessage
            }, {
                status: 422
            });
        } else {
            console.log(error);
        }
    }
}