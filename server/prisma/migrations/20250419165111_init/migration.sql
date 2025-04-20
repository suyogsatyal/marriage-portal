-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MarriageApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "husbandName" TEXT NOT NULL,
    "wifeName" TEXT NOT NULL,
    "husbandCitizenshipNo" TEXT NOT NULL,
    "wifeCitizenshipNo" TEXT NOT NULL,
    "dateOfMarriage" DATETIME NOT NULL,
    "witnessName" TEXT NOT NULL,
    "witnessCitizenshipNo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "certificateId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "MarriageApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationId" INTEGER NOT NULL,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Certificate_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "MarriageApplication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MarriageApplication_certificateId_key" ON "MarriageApplication"("certificateId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_applicationId_key" ON "Certificate"("applicationId");
