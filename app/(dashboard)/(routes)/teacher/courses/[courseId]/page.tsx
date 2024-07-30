import { IconBadge } from "@/components/ui/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
const CourseIdPage = async ({
    params
}:{
    params : {courseId : string}
})=>{
    const {userId} = auth();
    if(!userId){
        return redirect("/");
    }
    const course = await db.course.findUnique({
        where:{
            id: params.courseId
        }
    });
    const categories = await db.category.findMany({
        orderBy:{
            name:"asc",
        },
    });
  
    if(!course){
        return redirect("/");
    }
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];
    const totalField = requiredFields.length;
    const completedFileds = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFileds}/${totalField})`
    return(
        <div className="p-6">
            <div className="flex items-center justify-between  ">
            <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium ">Course Setup</h1>
            <span className="text-sm text-slate-700">Complete All Fields {completionText}</span>

            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                    <h2 className="text-xl ">Customise Your Course</h2>
                    </div>
                    <TitleForm
                    initialData =  {course}
                    courseId = {course.id}
                    />
                    <DescriptionForm
                    initialData =  {course}
                    courseId = {course.id}
                    />
                     <ImageForm
                    initialData =  {course}
                    courseId = {course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id} options={categories.map((category)=>({
                            label:category.name,
                            value:category.id,
                        }))}                    />
                </div>

            </div>
        </div>
        
    );
}
export default CourseIdPage;