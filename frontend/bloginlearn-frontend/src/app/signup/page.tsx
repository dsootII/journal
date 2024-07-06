'use client';
import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { FormEvent } from "react";
import { BACKEND_URL } from "@/lib/utils";
import { ENDPOINTS } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/useAuthContext";



export default function SignupPage() {
  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords don\'t match')
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      const response = await axios.post(
        BACKEND_URL+ENDPOINTS.signup, 
        values, 
        {withCredentials: true}
      );
      console.log(response.data);
      if (response.data['access']) {
        localStorage.setItem('accessToken', response.data['access']);
        localStorage.setItem('refreshToken', response.data['refresh']);
        router.push('/journal');
      } else {
        alert(response.data);
      }

    },
    validationSchema: SignupSchema
  });

  return(
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-white to-stone-800">
      <div className="flex h-full w-full justify-center items-center align-middle">
        
        <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Use this journal to track quests.</CardDescription>
            </CardHeader>
            
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    id="username" placeholder="Username..." />
                    {formik.errors.username && formik.touched.username ? (
                      <div className="text-red-500 text-sm">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email" placeholder="Email..." />
                    {formik.errors.email && formik.touched.email ? (
                      <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password" placeholder="Password..." type="password" />
                    {formik.errors.password && formik.touched.password ? (
                      <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    id="confirmPassword" placeholder="Confirm Password..." type="password" />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                      <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                </div>              
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline">I have an Account</Button>
                <Button type="submit">Signup</Button>
              </CardFooter>

            </form>

            
          </Card>

      </div>
    </div>
  );
}